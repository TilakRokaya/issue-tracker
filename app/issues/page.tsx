import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Issuepage(){
    return(
       
        <Button>
            <Link href="/issues/new">
                Report Issue
            </Link>
        </Button>
            
        
    );
}