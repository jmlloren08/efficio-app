import Loader from "../Loader";

const Success = ({ flash }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img
                id="background"
                className="w-48 h-48 mb-4"
                src="/images/svgs/success.svg"
            />
            <span className="font-bold text-black text-center">{flash.success}</span>
            <p className="text-sm text-center mt-4">Please wait, you will be redirected to report page</p>
            <Loader />
        </div>
    );
}

export default Success;