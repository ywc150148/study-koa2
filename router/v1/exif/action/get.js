module.exports = async (ctx, next) => {
  await ctx.render('upload/exif', {
    title: "读取图片exif"
  });
}