module.exports = async (ctx, next) => {
  await ctx.render('home', {
    title: "首页"
  });
}