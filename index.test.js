const process = require("process");
const cp = require("child_process");
const path = require("path");
const ip = path.join(__dirname, "index.js");

test("test parse action.yaml file", () => {
  process.env["INPUT_FILE"] = "action.yml";
  process.env["INPUT_DELIMITER"] = ".";
  process.env["INPUT_RETURN_TO_OUTPUTS"] = "true";

  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
  console.log(result);
  expect(result).toContain("node16");
  expect(result).toContain("description");
});

test("test parse Google AppEngine test.yaml file", () => {
  process.env["INPUT_FILE"] = "testfiles/test_gae.yaml";
  process.env["INPUT_DELIMITER"] = "_";
  process.env["INPUT_EXPORT_TO_ENVS"] = "true";

  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
  console.log(result);

  expect(result).toContain("test_settings");
  expect(result).toContain("automatic_scaling");
  expect(result).toContain(
    "gunicorn -b :$PORT main:app -w 1 -c gunicorn_conf.py"
  );
});

test("test parse one parameter at Google AppEngine test.yaml file", () => {
  process.env["INPUT_FILE"] = "./testfiles/test_gae.yaml";
  process.env["INPUT_KEY"] = "runtime";

  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
  console.log(result);

  expect(result).toContain("");
});

test("test parse Google AppEngine test.yaml file no export to envs", () => {
  process.env["INPUT_FILE"] = "testfiles/test_gae.yaml";
  process.env["INPUT_DELIMITER"] = "_";
  process.env["INPUT_EXPORT_TO_ENVS"] = "false";

  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
  console.log(result);

  expect(result).not.toContain("env_variables_DJANGO_SETTINGS_MODULE");
});
