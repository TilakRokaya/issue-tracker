'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";
import classnames from 'classnames';

export default function Navbar(){
const currentpath=usePathname();


    const link=[
        {label:'Dashboard', href:'/dashboard'},
        {label:'Issues',href:'/issues'}
    ]
  
    return(
    <nav className="flex space-x-5 border-2 mb-4 px-7 h-14 items-center">
        <Link href='/'>logo</Link>
        <ul className="flex space-x-4">
            {link.map((links)=>
                <li key={links.href}>
                    <Link key={links.href} 
                    className={classnames(
                        {'text-zinc-900':links.href===currentpath,
                        'text-zinc-400':links.href!==currentpath,
                        'hover:text-zinc-600':true}
                    )} href={links.href}>{links.label}</Link>
                </li>

            )}
            
           
        </ul>
    </nav>
    );
}