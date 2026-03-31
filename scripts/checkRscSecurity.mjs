import fs from "node:fs";
import path from "node:path";

function parseVersion(version) {
  const normalized = version.replace(/^[^\d]*/, "");
  const [major = "0", minor = "0", patch = "0"] = normalized.split(".");

  return [Number(major), Number(minor), Number(patch)];
}

function compareVersion(a, b) {
  const parsedA = parseVersion(a);
  const parsedB = parseVersion(b);

  for (let index = 0; index < 3; index += 1) {
    if (parsedA[index] > parsedB[index]) {
      return 1;
    }

    if (parsedA[index] < parsedB[index]) {
      return -1;
    }
  }

  return 0;
}

function assertMinVersion(name, actualVersion, minVersion) {
  if (compareVersion(actualVersion, minVersion) < 0) {
    throw new Error(
      `${name} 当前版本 ${actualVersion} 低于安全版本 ${minVersion}`
    );
  }
}

const packageLockPath = path.join(process.cwd(), "package-lock.json");
const packageLock = JSON.parse(fs.readFileSync(packageLockPath, "utf8"));
const rootPackage = packageLock.packages?.[""];

if (!rootPackage) {
  throw new Error("无法从 package-lock.json 读取根包依赖信息");
}

const dependencies = {
  next: rootPackage.dependencies?.next,
  react: rootPackage.dependencies?.react,
  "react-dom": rootPackage.dependencies?.["react-dom"],
};

assertMinVersion("next", dependencies.next, "15.5.9");
assertMinVersion("react", dependencies.react, "19.2.4");
assertMinVersion("react-dom", dependencies["react-dom"], "19.2.4");

console.log("RSC 安全版本校验通过");
