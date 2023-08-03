package com.project.catchJob.domain.project;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.catchJob.domain.member.Member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"member", "project"})
@Entity
public class P_reason {

	@Id @GeneratedValue
	private Long sReasonId;
	
	private String sRContents; // 모집사유
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false, updatable = false)
	private Member member;
	
	public void setMember(Member member) {
		this.member = member;
		member.getP_ReasonList().add(this);
	}
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "project_id", nullable = false, updatable = false)
	private Project project;
	
	public void setProject(Project project) {
		this.project = project;
		project.getProjectReasonList().add(this);
	}
}
