import Vue from "vue";
import {
    Layout, Button, Form, Input, Icon, Checkbox, Menu, ConfigProvider, DatePicker, Dropdown, Table, Breadcrumb, Row,
    Col, Card, Select, Tabs, Modal, Tree, Radio, InputNumber, Upload, Tag, Tooltip, Popconfirm, TreeSelect, message,
    notification, Collapse, Spin, Transfer, Popover, Steps, Empty, Cascader, Switch, Progress, TimePicker
} from 'ant-design-vue';

const components = [
    Popover,
    Transfer,
    Layout,
    Button,
    Form,
    Input,
    Icon,
    Checkbox,
    Menu,
    ConfigProvider,
    DatePicker,
    Dropdown,
    Table,
    Breadcrumb,
    Row,
    Col,
    Card,
    Spin,
    Select,
    Tabs,
    Modal,
    Tree,
    Radio,
    InputNumber,
    Upload,
    Tooltip,
    TimePicker,
    Progress,
    Tag,
    Popconfirm,
    TreeSelect,
    Collapse,
    Steps,
    Empty,
    Switch,
    Cascader
]
components.forEach(key => {
    Vue.use(key);
})
message.config({
    maxCount: 1
});
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$success = Modal.success;

