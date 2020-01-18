module.exports = async (ctx, next) => {
  await ctx.render('upload/file', {
    title: "上传文件"
  });
}