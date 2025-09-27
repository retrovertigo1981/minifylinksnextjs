import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Dashboard() {
	return (
		<div className='flex flex-col min-h-screen items-center justify-center'>
			<h1 className='text-center font-extrabold text-4xl'>Dashboard </h1>
			<Button className='m-4 w-20' variant='default'>
				<Link href='/'>Home</Link>
			</Button>
		</div>
	);
}
