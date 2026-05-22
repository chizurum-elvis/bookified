'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Show,
  UserButton,
  SignInButton,
  SignOutButton,
  useUser
} from "@clerk/nextjs";
import { cn } from '@/lib/utils';

const navItems = [
    {label: "Library", href: "/"},
    {label: "Add New", href: "/books/new"},
]

const Navbar = () => {
    const pathName = usePathname();
    const { user } = useUser();
  return (
    <header className="w-full fixed z-50 bg-secondary/80">
        <div className='wrapper navbar-height py-4 flex justify-between items-center'>
            <Link href='/' className='flex gap-0.5 items-center'>
                <Image src='/assets/logo.png' alt='Bookified Logo' width={42} height={26} />
                <span className='logo-text'>Bookified</span>
            </Link>
            
            <nav className='w-fit flex gap-7.5 items-center'>
                {navItems.map(({ label, href}: {label: string, href: string}) => {
                    const isActive = pathName === href || (href !== "/" && pathName.startsWith(href));

                    return (
                        <Link href={href} key={label} className={cn('nav-link-base', isActive && 'nav-link-active',
                        !isActive && 'text-black hover:opacity-70'
                        )}>
                            {label}
                        </Link>
                    )
                })}

                <div className='flex gap-7.5 items-center'>
                    <Show when="signed-out">
                        <SignInButton mode='modal'/>
                    </Show>

                    <Show when="signed-in">
                        <UserButton />
                        { user?.firstName && (
                            <Link href="/subscriptions" className='nav-user-name'>
                                {user.firstName}
                            </Link>
                        ) }
                    </Show>
                </div>

            </nav>
        </div>
    </header>
  )
}

export default Navbar