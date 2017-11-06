#Form验证助手

### 1.头像上传校验(avatarValidator)
> rule支持`accept(图片类型)`，`maxSize(大小限制，单位MB)`

```js
<FormItem
    {...formItemLayout}
    label="Upload"
    extra={`图片尺寸:小于${avatarMaxSize}MB,支持格式:${this.getAllowFileType().join("/")}`}
>
    <Avatar
        aspectRatio={1}
        width={210}
        height={210}
        {...getFieldProps('avatar', {
            rules: [
                {
                    validator: ValidatorHelp.get("avatarValidator"),
                    accept: ["image/png"],
                    maxSize: 1
                }
            ],
        })}
    />
</FormItem>
```