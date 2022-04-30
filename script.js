"use strict";
// função anônima
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    const calcTime = (milliseconds) => {
        // console.log(mil, "mil");
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const min = Math.floor(milliseconds / (1000 * 60));
        const sec = Math.floor((milliseconds % 60000) / 1000);
        return `${hours}h, ${min}m e ${sec}s`;
    };
    const parking = () => {
        const read = () => {
            return localStorage.parking ? JSON.parse(localStorage.parking) : [];
        };
        const save = (vehicles) => {
            localStorage.setItem("parking", JSON.stringify(vehicles));
        };
        const add = (vehicle, saveIt) => {
            var _a, _b;
            //saveit parametro opcional
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${vehicle.name}</td>
        <td>${vehicle.plate}</td>
        <td>${vehicle.entrance}</td>
        <td>
          <button class="delete btn btn-danger" data-plate=${vehicle.plate}>X</button>
        </td>
      `;
            (_a = row
                .querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                // this marcado, foi retirado o "strict" de tsconfig.json
                remove(this.dataset.plate);
            });
            (_b = $("#parking")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (saveIt)
                save([...read(), vehicle]);
        };
        const remove = (plate) => {
            const vehicle = read().find((vehicle) => vehicle.plate === plate);
            // console.log(vehicle!.name);
            const time = calcTime(new Date().getTime() - new Date(vehicle.entrance).getTime());
            if (!confirm(`The vehicle ${vehicle.name} has been parked for ${time}.\n Do you wish to close it?`))
                return;
            save(read().filter((vehicle) => vehicle.plate !== plate));
            $("#parking").innerHTML = "";
            render();
        };
        const render = () => {
            // por padrao coloca ? , mas da erro, o sinal de ! força o reconhecimento do elemento
            // $("#parking")!.innerHTML = "";
            const parking = read();
            // console.log(parking, "parking");
            if (parking.length) {
                parking.forEach((vehicle) => add(vehicle));
            }
        };
        return { read, add, remove, save, render };
    };
    parking().render();
    (_a = $("#register")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const name = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
        const plate = (_b = $("#plate")) === null || _b === void 0 ? void 0 : _b.value;
        if (!name || !plate)
            alert("The name and plate are required");
        parking().add({ name, plate, entrance: new Date().toISOString() }, true);
    });
})();
