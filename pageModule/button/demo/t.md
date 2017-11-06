---
order: 0
title: test
---

当需要在 `Button` 内嵌入 `Icon` 时，可以设置 `icon` 属性，或者直接在 `Button` 内使用 `Icon` 组件。

如果想控制 `Icon` 具体的位置，只能直接使用 `Icon` 组件，而非 `icon` 属性。

````jsx
import {SubmitGroupLarge} from 'component';
import {eq, util} from 'lodash/eq';

ReactDOM.render(
  <div>
    <SubmitGroupLarge/>
  </div>,
  mountNode
);
````
