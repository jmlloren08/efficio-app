
const ErrorMessage = ({ flash }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img
                id="background"
                className="w-48 h-48 mb-4"
                src="/images/svgs/error.svg"
            />
            <span className="font-bold text-black text-center">{flash.error}</span>
            <p className="text-sm text-center mt-4">Please wait, you will be redirected to creation page</p>
            <Loader />
        </div>

    );
}

export default ErrorMessage;