import swaggerAutogen from "swagger-autogen";

const outputFile = "../../swagger.json";
const endpointsFiles = ["../../src/index"];

const config = {
  info: {
    title: "Cosmo api",
    description: "My User Project Application API",
    license: { name: "MIT", url: "https://opensource.org/licenses/MIT" },
  },
  definitions: {
    auth_login_req: {
      username: "R0dger",
      password: "simplEPassword",
    },
    booking_post_req: {
      slotId: "632ef08e620cac93af6bf8d6",
      clientName: "R0dger",
      services: "Pilling, botex, fresh mask",
      location: "Dnipro city",
      phone: "+380987654321",
    },
    slot_get_res: [
      {
        _id: "632e2e26620cac93af6bf8ba",
        start: "2022-09-24T15:30:00.000Z",
        end: "2022-09-24T16:30:00.000Z",
        isFree: true,
      },
    ],
    slot_get_all_res: [
      {
        _id: "62f4085218d02598d17053be",
        start: "2022-08-16T13:30:00.000Z",
        end: "2022-08-16T14:30:00.000Z",
        isFree: false,
        booking: [
          {
            _id: "62f4093a18d02598d17053e1",
            slotId: "62f4085218d02598d17053be",
            clientName: "R0dger",
            services: "Pilling, botex, fresh mask",
            location: "Dnipro city",
            phone: "+380987654321",
          },
        ],
      },
    ],
    slot_post_req: [
      {
        start: "2022-09-23T07:00:00.000Z",
        end: "2022-09-23T08:00:00.000Z",
      },
    ],
    slot_delete_req: {
      slotId: "632ef08e620cac93af6bf8d6",
    },
  },
};

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, config).then(
  async () => {
    await import("../index");
    process.exit();
  }
);
