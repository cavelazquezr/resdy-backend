"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const reservation_services_1 = require("../services/reservation-services");
const reservation_validations_1 = require("../validations/reservation-validations");
let ReservationController = class ReservationController extends tsoa_1.Controller {
    async getMyReservations(authorization, status, city, search, start_date, end_date) {
        const query_params = {
            status,
            city,
            search,
            start_date,
            end_date,
        };
        await (0, reservation_validations_1.getMyReservationValidations)(authorization);
        return (0, reservation_services_1.getMyReservationsService)(authorization, query_params);
    }
    async getReservations(restaurant_name) {
        await (0, reservation_validations_1.getRestaurantReservationsValidations)(restaurant_name);
        return (0, reservation_services_1.getRestaurantReservationsService)(restaurant_name);
    }
    async postReservation(authorization, restaurant_name, reservation_input) {
        await (0, reservation_validations_1.createReservationValidations)(authorization, restaurant_name, reservation_input);
        return (0, reservation_services_1.createReservationService)(authorization, restaurant_name, reservation_input);
    }
    async putReservation(authorization, reservation_id, reservation_input) {
        await (0, reservation_validations_1.updateReservationValidation)(authorization, reservation_id);
        return (0, reservation_services_1.updateReservationService)(reservation_id, reservation_input);
    }
};
exports.ReservationController = ReservationController;
tslib_1.__decorate([
    (0, tsoa_1.Get)("myReservations"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Query)()),
    tslib_1.__param(2, (0, tsoa_1.Query)()),
    tslib_1.__param(3, (0, tsoa_1.Query)()),
    tslib_1.__param(4, (0, tsoa_1.Query)()),
    tslib_1.__param(5, (0, tsoa_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ReservationController.prototype, "getMyReservations", null);
tslib_1.__decorate([
    (0, tsoa_1.Get)("{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Path)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservations", null);
tslib_1.__decorate([
    (0, tsoa_1.Post)("{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReservationController.prototype, "postReservation", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)("{reservation_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReservationController.prototype, "putReservation", null);
exports.ReservationController = ReservationController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Reservation service"),
    (0, tsoa_1.Route)("reservation")
], ReservationController);
