import { useEffect } from "react";
import { useTezosCollectStore } from "api/store";
import { useRouter } from "next/router";

const Logout = () => {
  const { logout } = useTezosCollectStore();
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push("/");
  }, []);
  return <></>;
};

export default Logout;
