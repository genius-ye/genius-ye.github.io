---
layout: post
title: toolbar中设置menu收起图标颜色以及popupwindow弹出位置
tags: work android
---

1、设置menu收起图标颜色，就是那三个点的图标这里写图片描述，默认的如果使用light style 就是 黑色的，如果使用 dark style 就是白色的。
如何能够自定义颜色？

```java

 <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        <!-- 添加这一句， 即可改变图标的颜色-->
        <item name="android:textColorSecondary">#ffffff</item>
    </style>

```

2、一般情况下，点击收起menu的按钮，popwindow会覆盖在toolbar上，不美观，如何能够让popwindow在toolbar下方显示呢？

```java

 <style name="ToolbarPopupTheme" parent="@style/ThemeOverlay.AppCompat.Dark">
        <!--<item name="android:colorBackground">#000000</item> 也可以设置背景色以及menu中的其他属性-->
        <item name="actionOverflowMenuStyle">@style/OverflowMenuStyle</item>
    </style>

    <style name="OverflowMenuStyle" parent="Widget.AppCompat.Light.PopupMenu.Overflow">
        <item name="overlapAnchor">false</item>  <!--设置不覆盖锚点-->
    </style>

```

然后在toolbar中设置app:popupTheme

```xml

 <android.support.v7.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="?android:actionBarSize"
        android:background="?attr/colorPrimary"
        app:navigationIcon="@mipmap/back"
        app:popupTheme="@style/ToolbarPopupTheme">
</android.support.v7.widget.Toolbar>

```

效果如下:

![image](http://img.blog.csdn.net/20160920170317557)
