let workInProgressHook = null;
let isMount = true;

const fiber = {
  // 保存该FunctionComponent对应的Hooks链表
  memoizedState: null,

  stateNode: App,
};

const dispatchAction = (queue, action) => {
  // 创建update
  const update = {
    // 更新执行的函数
    action,
    // 连接同一个hook的其他更新，行程链表
    next: null,
  };

  // 环状单向链表
  if (queue.pending === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;

  // 调度更新
  schedule();
};

const schedule = () => {
  // 将 workInProgressHook 重置为 fiber 保存的第一个hook
  workInProgressHook = fiber.memoizedState;

  // 组件渲染
  let Component = fiber.type
  Component();

  // 首次渲染 表示 mount, 以后的渲染 表示 update
  isMount = false;
};

const hook = {
  queue: {
    pending: null,
  },

  memoizedState: initialState,

  next: null,
};

export const useState = (initialState) => {
  let hook;

  if (isMount) {
    hook = {
      queue: {
        pending: null,
      },
      memoizedState: initialState,
      next: null,
    };

    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }

    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;

    workInProgressHook = workInProgressHook.next;
  }

  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;

    do {
      const action = firstUpdate.action;

      baseState = action === 'function' ? action(baseState) : action;

      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next);

    hook.queue.pending = null;
  }

  hook.memoizedState = baseState;

  return [baseState, dispatchAction.bind(null, hook.queue)];
};


let baseState = hook.memoizedState;
if (hook.queue.pending) {
  let firstUpdate = hook.queue.pending.next;

  do {
    const action = firstUpdate.action;

    baseState = action === 'function' ? action(state) : action;

    firstUpdate = firstUpdate.next;
  } while (firstUpdate !== hook.queue.pending.next);

  hook.queue.pending = null;
}

hook.memoizedState = baseState;