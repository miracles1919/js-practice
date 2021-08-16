import { PermissionHoc } from './index';

const Admin = () => <div>admin</div>

export default PermissionHoc('admin')(Admin);
