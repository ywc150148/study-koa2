module.exports = async (ctx, next) => {
  await ctx.render('upload/img', {
    title: "上传文件"
  });
}