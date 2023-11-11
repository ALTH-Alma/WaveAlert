
import credentials from "./Credentials/credentials";
import MapContainer from "./MapContainer"

function DelimitArea()
{

    return (
        <div className="flex flex-col items-center justify-center p-2 bg-white">
            <h2 className="mb-8 mt-2 text-2xl font-poppins">Enviar Alerta</h2>
            <div className="flex flex-row">
                <MapContainer/>
                <div className="flex flex-col ml-24">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-4">Riesgo</th>
                            <th scope="col" className="px-6 py-4">Zona</th>
                            <th scope="col" className="px-6 py-4">Habilitada</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b dark:border-neutral-500 bg-red-200">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                Alto
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">Zona 1</td>
                            <td className="whitespace-nowrap px-6 py-4">No</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500 bg-red-200">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                Alto
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">Zona 2</td>
                            <td className="whitespace-nowrap px-6 py-4">No</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500 bg-green-200">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                Bajo
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">Zona 3</td>
                            <td className="whitespace-nowrap px-6 py-4">Si</td>
                            </tr> 
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default DelimitArea;