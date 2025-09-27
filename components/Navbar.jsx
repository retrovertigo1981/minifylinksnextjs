import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function Navbar() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch('/api/auth/me');
				if (!res.ok) throw new Error('Not authenticated');
				const data = await res.json();
				setUser(data.user);
			} catch (err) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	const handleLogout = async () => {
		await fetch('/api/auth/logout', { method: 'POST' });
		window.location.href = '/login';
	};

	const toggleTheme = () => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	};

	return (
		<header className='flex items-center justify-between p-6'>
			<Link href='/' className='text-2xl font-semibold'>
				Shorty
			</Link>
			<nav className='flex items-center'>
				{!loading &&
					(user ? (
						<>
							<DropdownMenu className='mr-2'>
								<DropdownMenuTrigger asChild>
									<Avatar className='cursor-pointer'>
										<AvatarImage src={user.image} alt='@shadcn' />
										<AvatarFallback>
											{user?.name?.charAt(0) + user?.lastname?.charAt(0)}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='w-48'>
									<DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Link href='/dashboard'>Dashboard</Link>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleLogout}>
										Logout
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<Button variant='ghost' className='ml-2' onClick={toggleTheme}>
								{resolvedTheme === 'dark' ? (
									<Sun className='w-5 h-5' />
								) : (
									<Moon className='w-5 h-5' />
								)}
							</Button>
						</>
					) : (
						<>
							<Button variant='ghost' asChild>
								<Link href='/login'>Login</Link>
							</Button>
							<Button variant='default' asChild className='ml-2'>
								<Link href='/signup'>Sign Up</Link>
							</Button>
							<Button variant='ghost' className='ml-2' onClick={toggleTheme}>
								{resolvedTheme === 'dark' ? (
									<Sun className='w-5 h-5' />
								) : (
									<Moon className='w-5 h-5' />
								)}
							</Button>
						</>
					))}
			</nav>
		</header>
	);
}
