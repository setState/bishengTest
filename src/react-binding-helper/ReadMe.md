###配套使用react-binding

import Binder from 'react-binding';

###具体使用

const {InputBox} = BindingHelper;

<InputBox model={Binder.bindTo(this.props.item, "dutyName")}/>
