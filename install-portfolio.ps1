<#
    Installs the portfolio implementation into this project.

    Extracts cj-portfolio-implementation.zip over the project root, backs up the
    existing .env first, verifies the files that actually matter landed, and then
    prints the remaining commands. Safe to run more than once.

    Usage (from the project root):
        powershell -ExecutionPolicy Bypass -File .\install-portfolio.ps1
#>

$ErrorActionPreference = 'Stop'

$root = $PSScriptRoot
$archive = Join-Path $root 'cj-portfolio-implementation.zip'

Write-Host ''
Write-Host 'Installing the CJ Roma portfolio' -ForegroundColor Cyan
Write-Host "Project root: $root"
Write-Host ''

if (-not (Test-Path $archive)) {
    Write-Host "Cannot find $archive" -ForegroundColor Red
    Write-Host 'Download it from the chat into the project root and run this again.'
    exit 1
}

# ---------------------------------------------------------------- back up .env
$envFile = Join-Path $root '.env'

if (Test-Path $envFile) {
    $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    $backup = Join-Path $root ".env.backup-$stamp"
    Copy-Item $envFile $backup
    Write-Host "Backed up .env -> $(Split-Path $backup -Leaf)" -ForegroundColor DarkGray
}

# ------------------------------------------------------------------- extract
Write-Host 'Extracting...' -ForegroundColor Cyan

$extracted = $false

try {
    Expand-Archive -Path $archive -DestinationPath $root -Force
    $extracted = $true
    Write-Host 'Extracted with Expand-Archive.' -ForegroundColor DarkGray
} catch {
    Write-Host "Expand-Archive failed: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host 'Falling back to tar...' -ForegroundColor Yellow

    Push-Location $root
    try {
        & tar -xf $archive
        if ($LASTEXITCODE -eq 0) {
            $extracted = $true
            Write-Host 'Extracted with tar.' -ForegroundColor DarkGray
        }
    } finally {
        Pop-Location
    }
}

if (-not $extracted) {
    Write-Host 'Extraction failed with both methods. Extract the zip manually (right-click -> Extract All, into this folder) and run this script again to verify.' -ForegroundColor Red
    exit 1
}

# -------------------------------------------------------------------- verify
Write-Host ''
Write-Host 'Verifying...' -ForegroundColor Cyan

$required = @(
    'routes\web.php',
    'routes\admin.php',
    'app\Http\Controllers\PortfolioController.php',
    'app\Models\SiteSetting.php',
    'app\Services\Auth\HashedPinVerifier.php',
    'app\Rules\MatchesAdminPin.php',
    'config\portfolio.php',
    'database\seeders\PortfolioContentSeeder.php',
    'database\seeders\AdminUserSeeder.php',
    'database\migrations\2026_08_04_090000_add_two_factor_columns_to_users_table.php',
    'resources\css\portfolio.css',
    'resources\js\pages\portfolio\show.tsx',
    'resources\js\pages\admin\login.tsx',
    'public\images\cj-portrait.jpeg'
)

$missing = @()

foreach ($file in $required) {
    if (-not (Test-Path (Join-Path $root $file))) {
        $missing += $file
    }
}

$migrations = @(Get-ChildItem (Join-Path $root 'database\migrations') -Filter '2026_08_04_10*.php' -ErrorAction SilentlyContinue)

if ($migrations.Count -ne 10) {
    $missing += "database\migrations\2026_08_04_* (found $($migrations.Count), expected 10)"
}

if ($missing.Count -gt 0) {
    Write-Host 'These are still missing:' -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    exit 1
}

Write-Host "All checks passed ($($required.Count) key files, 10 migrations)." -ForegroundColor Green

# ------------------------------------------------------- routes/web.php sanity
$webRoutes = Get-Content (Join-Path $root 'routes\web.php') -Raw

if ($webRoutes -match 'PortfolioController') {
    Write-Host '"/" now points at PortfolioController.' -ForegroundColor Green
} else {
    Write-Host 'routes\web.php does not reference PortfolioController — the old file survived. Check for a read-only flag on it.' -ForegroundColor Red
    exit 1
}

# --------------------------------------------------------------- next steps
Write-Host ''
Write-Host 'Next, run these:' -ForegroundColor Cyan
Write-Host ''
Write-Host '  mysql -u root -e "CREATE DATABASE IF NOT EXISTS cj_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"'
Write-Host '  composer dump-autoload'
Write-Host '  php artisan migrate'
Write-Host '  php artisan db:seed'
Write-Host '  php artisan optimize:clear'
Write-Host '  npm run build'
Write-Host '  composer dev'
Write-Host ''
Write-Host 'Then: portfolio.test = the portfolio, portfolio.test/admin = content admin (PIN 010121).' -ForegroundColor DarkGray
Write-Host 'Compare .env against the backup this script made — DB and PIN keys come from the archive.' -ForegroundColor DarkGray
Write-Host ''
