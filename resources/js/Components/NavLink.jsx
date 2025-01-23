import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props

}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center p-2 text-xs transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'rounded-lg border-primary font-bold bg-gray-900 text-white'
                    : 'hover:bg-gray-900 hover:rounded-lg hover:text-white hover:font-bold text-gray-400') +
                className
            }
        >
            {children}
        </Link>
    );
}
