import { Redirect } from 'umi'
import {useStore} from "@/pages/store";

export default (props : any) => {
  // @ts-ignore
  const {loginstateStore} = useStore();

  if (loginstateStore.isDone) {
    return <div>{ props.children }</div>;
  } else {
    // @ts-ignore
    return <Redirect to="/login" />;
  }

}
