
//对于errorCode判断中
//成功
MessageNew.success({
  title: '添加成功',
  content: result.message
});

//失败
MessageNew.error({
  title: '添加失败',
  content: result.message,
});


//对于promise中err,则是根据字典Dict中的配置来添加
MessageNew.error({
    title: Dict.Messages.title[10001],
    content: Dict.Messages.content[10001]
});