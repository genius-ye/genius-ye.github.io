---
layout: post
title: SharedPreferences.onSharedPreferenceChangeListener不执行
tags: android
---

> 这是一个很诡异的问题。SharedPreferences一直在WeakHashMap保持监听。这意味着你不能用匿名的内部类作为监听器，因为一旦你离开当前的范围它将变成回收的目标。它将首先工作，但是最终，仍然要被回收，被从WeakHashMap移除然后停止工作。
在你的类中的一个位置引用一个监听器，这样就好了，提供你的类的实例也不会被销毁。

首先得定义个==全局==的OnSharedPreferenceChangeListener

```
private SharedPreferences.OnSharedPreferenceChangeListener prefListner;

```

然后再去添加监听

```
prefListner = new SharedPreferences.OnSharedPreferenceChangeListener(){
            public void onSharedPreferenceChanged(SharedPreferences prefs, String key) {

            }
        };
App.sharedPreferences.registerOnSharedPreferenceChangeListener(prefListner);

```
