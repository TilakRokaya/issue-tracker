import Link from "next/link"
export default function Navbar(){
    const link=[
        {label:'issues', href:'/issues'},
        {label:'tracker',href:'/tracker'}
    ]
  
    return(
    <nav className="flex space-x-5 border-2 my-2 mx-2 px-5 h-10 items-center">
        <Link href='/'>logo</Link>
        <ul className="flex space-x-4">
            {link.map((links)=>
                <li key={links.href} className="hover:text-zinc-400">
                    <Link href={links.href}>{links.label}</Link>
                </li>

            )}
            
           
        </ul>
    </nav>
    );
}