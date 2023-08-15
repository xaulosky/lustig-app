import React, { useState } from 'react';

function ClienteSelector({ clientes }) {
    const [selectedClientId, setSelectedClientId] = useState('');

    const handleInputChange = (event) => {
        setSelectedClientId(event.target.value);
    };

    const selectedClient = clientes.find(cliente => cliente.id === selectedClientId);

    return (
        <div>
            <input list="clientesList" value={selectedClientId} onChange={handleInputChange} />
            <datalist id="clientesList">
                {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.nombre} data-key={cliente.id}>
                        {cliente.nombre} {cliente.apellido} {cliente.rut}
                    </option>
                ))}
            </datalist>

            {selectedClient && (
                <div>
                    <p>Cliente seleccionado: {selectedClient.nombre} {selectedClient.apellido}</p>
                    <p>Key del cliente seleccionado: {selectedClientId}</p>
                </div>
            )}
        </div>
    );
}

export default ClienteSelector;
