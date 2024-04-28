import PlacesComplete from "../PlacesAutoComplete";

export default function FormProperties() {
    return (
        <div>
            <div className="bg-white border-[2.5px] py-12 px-10">
                <h2 className="text-2xl">Filtro de busqueda</h2>
                <form action="">
                    <div className="m-0">
                        <PlacesComplete />
                    </div>
                    <select id="buyrent" className=" border-[2px] p-1.5 w-full mb-4">
                        <option value="" selected disabled>
                            ¿En venta o alquiler?
                        </option>
                        <option value="any">Cualquiera</option>
                        <option value="buy">Comprar</option>
                        <option value="rent">Alquilar</option>
                    </select>

                    <select
                        id="propertietype"
                        className=" border-[2px] p-1.5 w-full mb-4"
                        defaultChecked="none"
                    >
                        <option value="" selected disabled>
                            Tipo de propiedad
                        </option>
                        <option value="any">Cualquiera</option>
                        <option value="apartment">Apartamento</option>
                        <option value="house">Casa</option>
                    </select>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="number"
                            placeholder="Desde"
                            id="minprice"
                            min="0"
                            className="w-full border-[2px] p-2"
                        />
                        <input
                            type="number"
                            placeholder="Hasta"
                            id="maxprice"
                            min="0"
                            className="w-full border-[2px] p-2"
                        />
                    </div>

                    <div>
                        <input
                            type="number"
                            placeholder="Número de habitaciones"
                            id="bedrooms"
                            min="0"
                            className="w-full border-[2px] p-2 mb-4"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Número de baños"
                            id="bathrooms"
                            min="0"
                            className="w-full border-[2px] p-2 mb-4"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Número de parqueos"
                            id="parking"
                            min="0"
                            className="w-full border-[2px] p-2"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
