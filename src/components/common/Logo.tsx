import { Link } from "react-router-dom";
import { Rotate3d } from "lucide-react";

export default function Logo() {
  return (
    <Link to={"/"} className="text-xl font-semibold flex items-center gap-1">
      <Rotate3d />
      Forms
    </Link>
  );
}
