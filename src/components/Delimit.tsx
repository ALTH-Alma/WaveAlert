import MapDrawingTools from "./MapDrawingTools";

function SendAlert()
{
    return (
        <div className="flex flex-col items-center justify-center p-2 bg-white">
            <h2>Delimitar Área</h2>

            <MapDrawingTools></MapDrawingTools>
        </div>
    )
}

export default SendAlert;