sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("leco.sausermgt.controller.Main", {
        onInit() {

            var oModel = new JSONModel();
            this.getView().setModel(oModel, "users");
            $.ajax({
                url: "/scim-api/Users",
                method: "GET",
                success: function (data) {
                    console.log("Fetched users successfully");
                    oModel.setData(data.Resources || []);
                },
                error: function (err) {
                    console.error("Error fetching users", err);
                }
            })

        }
    });
});