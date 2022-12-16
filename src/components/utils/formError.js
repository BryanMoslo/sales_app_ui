export default function FormError({errorMessage}) {

    return errorMessage !== '' ?
        (
            <div className="whitespace-pre-line mt-4">
                <div role="alert">
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                        Some errors were found:
                    </div>
                    <div
                        className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        {errorMessage}
                    </div>
                </div>
            </div>
        ) : ''
}