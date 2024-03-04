
const AuthLayout = ({
    children
}: {children: React.ReactNode}) => {
    return ( 
        <div className="h-full flex flex-col justify-center items-center">
            {children}
        </div>
     );
}
 
export default AuthLayout;