import { Button } from "@/components/ui/button";
import  Link  from "next/link";


const CarrersPage = () => {
    return (
        <div className="p-6">
          <Link href="/administrator/create">
            <Button className="bg-blue-500 text-white">
              Nueva Carrera
            </Button>
          </Link>
        </div>
      );
}
export default CarrersPage;