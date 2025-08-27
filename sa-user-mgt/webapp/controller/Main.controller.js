sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("leco.sausermgt.controller.Main", {
        onInit() {

            var oModel = new JSONModel();
            this.getView().setModel(oModel, "users");
            var vURL = "/scim-api/Users";
            var sURL = this._getExternalServiceRuntimeBaseURL() + vURL;


            $.ajax({
                url: sURL,
                method: "GET",
                dataType: "json",
                contentType: "application/json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                },
                success: function (data) {
                    console.log("Fetched users successfully");
                    console.log(data);
                    oModel.setData(data.resources || []);
                },
                error: function (err) {
                    console.log("Failed-", err.status + ": " + err.statusText);
                    alert("An error occurred while fetching users.");
                    console.error("Error fetching users", err);
                }
            })

        },

        _getExternalServiceRuntimeBaseURL: function () {
            var oComponent = sap.ui.core.Component.getOwnerComponentFor(this.getView());

            if (oComponent) {
                var sAppId = oComponent.getManifestEntry("/sap.app/id");
                console.log("sAppId-" + sAppId);
                var sAppPath = sAppId.replaceAll(".", "/");
                var sAppModulePath = jQuery.sap.getModulePath(sAppPath);
                console.log("sAppModulePath-" + sAppModulePath);

                return sAppModulePath;
            }
            else {
                console.error("Component could not be found.");
                return "";
            }
        },
    });
});