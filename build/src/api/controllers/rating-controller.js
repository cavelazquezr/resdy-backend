"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const rating_services_1 = require("../services/rating-services");
const rating_validations_1 = require("../validations/rating-validations");
let RatingController = class RatingController extends tsoa_1.Controller {
    async getMyRating(authorization, unauthorizedCallback, status, city, search) {
        const query_params = {
            status,
            city,
            search,
        };
        await (0, rating_validations_1.getMyRatingsValidations)(authorization, unauthorizedCallback);
        return (0, rating_services_1.getMyRatingsService)(authorization, query_params);
    }
    async getRatings(restaurant_name, unauthorizedCallback) {
        await (0, rating_validations_1.getRestaurantRatingsValidations)(restaurant_name, unauthorizedCallback);
        return (0, rating_services_1.getRestaurantRatingsService)(restaurant_name);
    }
    async getRatingStats(restaurant_name, unauthorizedCallback) {
        await (0, rating_validations_1.getRestaurantRatingStatsValidations)(restaurant_name, unauthorizedCallback);
        return (0, rating_services_1.getRestaurantRatingStatsService)(restaurant_name);
    }
    async putRating(authorization, rating_id, rating_record, unauthorizedCallback) {
        await (0, rating_validations_1.putRatingValidations)(authorization, rating_id, unauthorizedCallback);
        return (0, rating_services_1.putRatingService)(rating_id, rating_record);
    }
};
exports.RatingController = RatingController;
tslib_1.__decorate([
    (0, tsoa_1.Get)("myRatings"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Res)()),
    tslib_1.__param(2, (0, tsoa_1.Query)()),
    tslib_1.__param(3, (0, tsoa_1.Query)()),
    tslib_1.__param(4, (0, tsoa_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "getMyRating", null);
tslib_1.__decorate([
    (0, tsoa_1.Get)("{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Path)()),
    tslib_1.__param(1, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "getRatings", null);
tslib_1.__decorate([
    (0, tsoa_1.Get)("stats/{restaurant_name}"),
    tslib_1.__param(0, (0, tsoa_1.Path)()),
    tslib_1.__param(1, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "getRatingStats", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)("{rating_id}"),
    tslib_1.__param(0, (0, tsoa_1.Header)()),
    tslib_1.__param(1, (0, tsoa_1.Path)()),
    tslib_1.__param(2, (0, tsoa_1.Body)()),
    tslib_1.__param(3, (0, tsoa_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], RatingController.prototype, "putRating", null);
exports.RatingController = RatingController = tslib_1.__decorate([
    (0, tsoa_1.Tags)("Rating service"),
    (0, tsoa_1.Route)("rating")
], RatingController);
