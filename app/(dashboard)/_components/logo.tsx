import Image from "next/image";

export const Logo = () => {
    return (
        <div className="logo-container">
            <Image
                height={200}
                width={200}
                alt="logo"
                src="/ll.png"
            />
            <h2 className="logo-title">RACE HUB CONNECT</h2>
        </div>
    );
}


///////////////////es para la configuracion del logo 
