import {
        Form as RouterForm,
} from "react-router-dom";

export default function Form({title, children, onSubmit}) {
    return (
        <div>
            <h3 className="text-3xl font-medium text-gray-700">{title}</h3>
            <div className="mt-4">
                <div className="p-6 bg-white rounded-md shadow-md">
                    <RouterForm method="post">
                        {children}
                        <div className="flex justify-end mt-4">
                            <button className="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                Save
                            </button>
                        </div>
                    </RouterForm>
                </div>
            </div>
        </div>
    )
}