/**
 * Crea una cuenta de alumno en Supabase Auth, sin registro público.
 *
 *   npm run alumnos:crear
 *
 * - Lee SUPABASE_URL y SUPABASE_SECRET_KEY de .env.local (nunca del código).
 * - Pide el correo y la contraseña en la terminal; la contraseña no se
 *   muestra al escribirla, no se pasa como argumento (no queda en el
 *   historial de la terminal) y no se guarda ni se imprime en ningún sitio.
 * - Supabase guarda solo su hash. La cuenta se crea ya confirmada, así que
 *   el alumno puede entrar directamente en /alumnos/acceso.
 *
 * La clave secreta solo debe existir en el ordenador de quien administra
 * las cuentas. Nunca en Vercel ni en el navegador.
 */
import { createInterface } from "node:readline/promises";
import { stdin, stdout, exit } from "node:process";
import { createClient } from "@supabase/supabase-js";

const PASSWORD_MIN_LENGTH = 10; // misma política que src/lib/alumnos/config.ts
const PASSWORD_MAX_LENGTH = 128;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  exit(1);
}

/** Lee una línea sin mostrar lo que se escribe. */
function askHidden(question) {
  return new Promise((resolve) => {
    stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";
    const cleanup = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.off("data", onData);
    };
    function onData(chunk) {
      for (const char of chunk) {
        if (char === "\r" || char === "\n") {
          cleanup();
          stdout.write("\n");
          resolve(value);
          return;
        }
        if (char === "\u0003") {
          cleanup();
          stdout.write("\n");
          exit(130);
        }
        if (char === "\u007f" || char === "\b") {
          value = value.slice(0, -1);
          continue;
        }
        value += char;
      }
    }
    stdin.on("data", onData);
  });
}

const url = process.env.SUPABASE_URL?.trim();
const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();

if (!url || !secretKey) {
  fail("Faltan SUPABASE_URL o SUPABASE_SECRET_KEY en .env.local (ver .env.example).");
}
if (secretKey.startsWith("sb_publishable_")) {
  fail("SUPABASE_SECRET_KEY contiene la clave publicable. Usa la clave secreta (sb_secret_…) o service_role.");
}
if (!stdin.isTTY) {
  fail("Ejecuta este comando en una terminal interactiva (PowerShell o la terminal de VS Code).");
}

console.log("\nNueva cuenta de alumno — PSAI FLOW ACADEMY\n");

const rl = createInterface({ input: stdin, output: stdout });
const email = (await rl.question("Correo electrónico: ")).trim().toLowerCase();
rl.close();

if (!EMAIL_PATTERN.test(email)) fail("El correo electrónico no es válido.");

const password = await askHidden(`Contraseña (mínimo ${PASSWORD_MIN_LENGTH} caracteres, no se mostrará): `);
if (password.length < PASSWORD_MIN_LENGTH) fail(`La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`);
if (password.length > PASSWORD_MAX_LENGTH) fail(`La contraseña debe tener como máximo ${PASSWORD_MAX_LENGTH} caracteres.`);
const confirmation = await askHidden("Repite la contraseña: ");
if (confirmation !== password) fail("Las contraseñas no coinciden. No se ha creado ninguna cuenta.");

const admin = createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});

const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });

if (error) {
  if (error.code === "email_exists") fail("Ya existe una cuenta con ese correo.");
  if (error.code === "weak_password") fail("Supabase considera la contraseña demasiado débil. Elige otra.");
  fail(`Supabase no ha podido crear la cuenta (${error.code ?? error.status ?? "error"}): ${error.message}`);
}

console.log(`\n✔ Cuenta creada para ${data.user.email}`);
console.log("  Ya puede entrar en /alumnos/acceso con ese correo y la contraseña elegida.\n");
