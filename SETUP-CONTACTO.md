# Configuración del Formulario de Contacto

El formulario de contacto en la página `/contacto` está preparado para usar **Formspree**, un servicio gratuito que permite recibir los mensajes de los clientes directamente en tu correo electrónico.

## Pasos para configurar Formspree

### 1. Crear cuenta en Formspree

1. Ve a [https://formspree.io/](https://formspree.io/)
2. Haz clic en "Get Started" o "Sign Up"
3. Crea una cuenta gratuita con tu correo electrónico

### 2. Crear un nuevo formulario

1. Una vez dentro de tu cuenta, haz clic en "+ New Form"
2. Dale un nombre al formulario (por ejemplo: "Contacto Tienda Gamer")
3. Formspree te dará un **Form ID** único (algo como `mxxxxxxx`)

### 3. Configurar el formulario en el código

1. Abre el archivo `src/pages/Contacto.tsx`
2. Busca la línea 50 que dice:
   ```typescript
   const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
   ```
3. Reemplaza `YOUR_FORM_ID` con el ID que te dio Formspree
4. Por ejemplo:
   ```typescript
   const response = await fetch("https://formspree.io/f/mxxxxxxx", {
   ```

### 4. Probar el formulario

1. Guarda los cambios
2. Ve a tu página de Contacto
3. Llena el formulario y envíalo
4. Recibirás el mensaje en el correo electrónico que usaste para registrarte en Formspree
5. También podrás ver todos los mensajes en el panel de Formspree

## Características implementadas

- ✅ Validación de campos obligatorios
- ✅ Estado de carga mientras se envía el formulario
- ✅ Notificaciones toast de éxito/error
- ✅ Reset del formulario después de envío exitoso
- ✅ Manejo de errores
- ✅ Campos: nombre, email, teléfono, asunto, mensaje

## Plan gratuito de Formspree

El plan gratuito incluye:
- 50 envíos por mes
- Almacenamiento de mensajes
- Notificaciones por email
- Sin marca de agua

Si necesitas más envíos, puedes actualizar al plan de pago.

## Alternativas a Formspree

Si prefieres otra solución, puedes usar:

1. **EmailJS** - Similar a Formspree, también gratuito
2. **Backend propio** - Si tienes un servidor, puedes crear tu propio endpoint
3. **Netlify Forms** - Si despliegas en Netlify
4. **Google Forms** - Opción más básica pero funcional

## Importante

**Nota sobre el número de WhatsApp:** Recuerda también actualizar el número de WhatsApp `573001234567` en varios archivos:
- `src/pages/Contacto.tsx` (líneas 19 y 134)
- `src/pages/ArmaTuPc.tsx` (línea 164)
- `src/components/layout/Header.tsx` (si lo tienes)

Reemplázalo con tu número real de WhatsApp en formato internacional (sin espacios ni guiones).
