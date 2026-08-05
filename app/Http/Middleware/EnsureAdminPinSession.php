<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Services\Auth\AdminPinSession;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Gate for every admin route except the PIN screen itself (RULES §5.1).
 */
final readonly class EnsureAdminPinSession
{
    public function __construct(private AdminPinSession $pinSession) {}

    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($this->pinSession->isConfirmed()) {
            return $next($request);
        }

        if ($request->expectsJson()) {
            abort(Response::HTTP_FORBIDDEN, __('The admin PIN session has expired.'));
        }

        return redirect()
            ->route('admin.login')
            ->with('error', __('Enter your PIN to manage the portfolio.'));
    }
}
