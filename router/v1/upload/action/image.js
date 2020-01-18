module.exports = async (ctx, next) => {
  await ctx.render('upload/image', {
    title: "上传图片"
  });
}