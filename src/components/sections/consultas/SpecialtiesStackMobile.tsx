import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import CardFeature from "@/components/cards/CardFeature";
import { SPECIALTIES } from "./specialtiesData";

/**
 * Versión móvil (< 640px) de "Especialidades que pueden integrarse durante
 * la consulta": las mismas tarjetas que la cuadrícula de tablet/desktop
 * (mismos datos, mismo componente visual CardFeature), presentadas como un
 * Scroll Stack — cada tarjeta se apila progresivamente mientras el usuario
 * hace scroll con el dedo, en vez de mostrarse en una cuadrícula estática.
 */
export default function SpecialtiesStackMobile() {
  return (
    <div className="h-[min(78vh,600px)] min-h-[420px] overflow-hidden">
      <ScrollStack>
        {SPECIALTIES.map((specialty) => (
          <ScrollStackItem key={specialty.title}>
            <CardFeature icon={specialty.icon} title={specialty.title} description={specialty.description} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}
