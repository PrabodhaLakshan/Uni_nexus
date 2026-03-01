import { GenericNavbar } from '@/components/GenericNavbar';
import { STUDENT_LINKS } from '@/constants/navigation';

export default function StudentDashboard() {
  return (
    <>
      <GenericNavbar links={STUDENT_LINKS} portalName="Student Connect" />
      <div className="mt-24">{/* ඉතුරු content ටික */}</div>
    </>
  );
}