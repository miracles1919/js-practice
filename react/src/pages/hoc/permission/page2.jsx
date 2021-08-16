import { PermissionHoc } from './index';

const User = () => <div>user</div>

export default PermissionHoc('user')(User);
