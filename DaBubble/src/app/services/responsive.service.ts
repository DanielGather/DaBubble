import { Injectable, computed, inject, signal, effect } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThreadService } from './thread.service';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  constructor() {
    effect(() => {
      if (this.isMedium()) {
        this.goBack.set(false);
      }
      if (this.isSmall() && !this.channelOpen()) {
        this.goBack.set(true);
      }
    });
  }
  private threadService = inject(ThreadService);

  public breakpointObserver = inject(BreakpointObserver);

  public sidebarOpen = signal(true);

  public goBack = signal<boolean>(false);

  public channelOpen = signal<boolean>(false);

  private smallBreakpoint = toSignal(
    this.breakpointObserver.observe('(max-width: 768px)')
  );

  private mediumBreakpoint = toSignal(
    this.breakpointObserver.observe(
      '(min-width: 769px) and (max-width: 1024px)'
    )
  );

  private largeBreakpoint = toSignal(
    this.breakpointObserver.observe('(min-width: 1025px)')
  );

  // Custom Breakpoints
  isSmall = computed(() => this.smallBreakpoint()?.matches ?? false);
  isMedium = computed(() => this.mediumBreakpoint()?.matches ?? false);
  isLarge = computed(() => this.largeBreakpoint()?.matches ?? false);

  showSidebar = computed(() => {
    // if (this.isSmall() && this.goBack() && !this.channelOpen()) return true;
    if (this.isSmall() && this.channelOpen()) return false;
    if (this.isSmall() && !this.channelOpen()) return true;
    if (this.isMedium() && this.threadService.threadbarOpen()) return false;
    if (this.isMedium()) return true;
    if (this.isMedium()) return true;
    if (this.isLarge()) return true;
    if (this.isSmall()) return true;
    return false;
  });
}
