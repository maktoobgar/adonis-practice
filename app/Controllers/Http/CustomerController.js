"use strict";

const Customer = use("App/Models/Customer");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const customers = await Customer.all();
    if (customers && customers.rows.length) {
      response.status(200).json({
        message: "OK",
        data: customers,
      });
      return;
    }
    response.status(404).json({
      message: "Not Found",
    });
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { name, description } = request.post();
    const customer = await Customer.create({ name, description });
    await customer.save();
    response.status(201).json({
      message: "Customer Created.",
      data: customer,
    });
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const { id } = params;
    const customer = await Customer.find(id);
    if (customer) {
      response.status(200).json({
        message: "OK",
        data: customer,
      });
      return;
    }
    response.status(404).json({
      message: "Not Found",
    });
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params;
    const customer = await Customer.find(id);
    if (customer) {
      const { name, description } = request.post();
      if (name) customer.name = name;
      if (description) customer.description = description;
      await customer.save();
      response.status(200).json({
        message: "OK",
        data: customer,
      });
      return;
    }
    response.status(404).json({
      message: "Not Found",
    });
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const customer = await Customer.find(id);
    if (customer) {
      await customer.delete();
      response.status(204).json();
      return;
    }
    response.status(404).json({
      message: "Not Found",
    });
  }
}

module.exports = CustomerController;