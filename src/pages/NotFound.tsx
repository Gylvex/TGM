import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    // Auto-redirect to home page after showing message briefly
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">¡Ups! Página no encontrada</p>
        <p className="mb-4 text-sm text-muted-foreground">Redirigiendo al inicio...</p>
        <a
          href="/"
          className="text-primary underline hover:text-primary/90"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { replace: true });
          }}
        >
          Volver al inicio ahora
        </a>
      </div>
    </div>
  );
};

export default NotFound;
